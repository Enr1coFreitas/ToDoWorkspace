<?php

namespace App\Http\Controllers;

class QuoteController extends Controller
{
    public function quote() {
        $quotes = [
            'domingo'    => "Domingo é um novo começo, aproveite para recarregar suas energias!",
            'segunda'    => "Segunda-feira é o dia perfeito para começar a semana com foco e determinação!",
            'terca'      => "Terça-feira é mais um passo rumo aos seus objetivos. Continue firme!",
            'quarta'     => "Nesta Quarta-feira, lembre-se: cada esforço conta para o seu sucesso!",
            'quinta'     => "Quinta-feira chegou! Falta pouco para o fim de semana, continue dando o seu melhor!",
            'sexta'      => "Sexta-feira! Feche a semana com chave de ouro e celebre suas conquistas!",
            'sabado'     => "Sábado é o dia para relaxar e renovar suas energias. Você merece!"
        ];
    
        $diaSemana = strtolower(now()->format('l'));
        $dias = [
            'sunday'    => 'domingo',
            'monday'    => 'segunda',
            'tuesday'   => 'terca',
            'wednesday' => 'quarta',
            'thursday'  => 'quinta',
            'friday'    => 'sexta',
            'saturday'  => 'sabado'
        ];
    
        $mensagem = $quotes[$dias[$diaSemana]];
    
        return response()->json([
            'quote' => $mensagem
        ]);
    }
}