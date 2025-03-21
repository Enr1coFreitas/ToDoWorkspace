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
    private const CACHE_DURATION = 86400; // 24 hours in seconds

    public function __construct()
    {
        $this->apiKey = config('services.giphy.api_key');
    }

    /**
     * Get the daily GIF from cache or fetch a new one
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDailyGif()
    {
        try {
            $gif = Cache::remember(self::CACHE_KEY, self::CACHE_DURATION, function () {
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
     * Fetch a random GIF from Giphy API
     *
     * @return array
     * @throws \Exception
     */
    private function fetchRandomGif()
    {
        $response = Http::get('https://api.giphy.com/v1/gifs/random', [
            'api_key' => $this->apiKey,
            'rating' => 'g'
        ]);

        if ($response->failed()) {
            throw new \Exception('Failed to fetch GIF from Giphy: ' . $response->status());
        }

        $data = $response->json();
        
        return [
            'url' => $data['data']['images']['original']['url'],
            'title' => $data['data']['title'],
            'id' => $data['data']['id'],
            'fetched_at' => now()->toDateTimeString()
        ];
    }
}

