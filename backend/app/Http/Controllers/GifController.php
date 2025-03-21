<?php
 
 namespace App\Http\Controllers;
 
 use Illuminate\Http\Request;
 use Illuminate\Support\Facades\Http;
 use Illuminate\Support\Facades\Cache;
 use Illuminate\Support\Facades\Log;
 
 class GifController extends Controller
 {
     private $apiKey;
     private const CACHE_KEY = 'daily_gif';
     private const CACHE_DURATION = 86400;
 
     public function __construct()
     {
         $this->apiKey = config('services.giphy.api_key');
     }
 
     /**
      * @return \Illuminate\Http\JsonResponse
      */
     public function getDailyGif()
     {
         try {
             $diaSemana = strtolower(now()->format('l'));
             $cacheKey = self::CACHE_KEY . '_' . $diaSemana;
             
             $gif = Cache::remember($cacheKey, self::CACHE_DURATION, function () {
                 return $this->fetchRandomGif();
             });
 
             return response()->json([
                 'success' => true,
                 'data' => $gif
             ]);
         } catch (\Exception $e) {
             Log::error('GIF retrieval failed: ' . $e->getMessage());
             
             return response()->json([
                 'success' => false,
                 'message' => 'Failed to fetch GIF'
             ], 500);
         }
     }
 
     /**
      * @return array
      * @throws \Exception
      */
     private function fetchRandomGif()
     {
         $diaSemana = strtolower(now()->format('l'));
         $response = Http::get('https://api.giphy.com/v1/gifs/search', [
             'api_key' => $this->apiKey,
             'rating' => 'g', 
             'q' => $diaSemana,
             'limit' => 25
         ]);
 
         if ($response->failed()) {
             throw new \Exception('Failed to fetch GIF from Giphy: ' . $response->status());
         }
 
         $data = $response->json();
         
         if (empty($data['data'])) {
             throw new \Exception('No GIFs found for search term: ' . $diaSemana);
         }
         
         $randomIndex = array_rand($data['data']);
         $gifData = $data['data'][$randomIndex];
         
         return [
             'url' => $gifData['images']['original']['url'],
             'title' => $gifData['title'],
             'id' => $gifData['id'],
             'day' => $diaSemana
         ];
     }
 }