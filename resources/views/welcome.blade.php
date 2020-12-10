<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="{{ URL::asset('/favicon.ico') }}" type="image/x-icon"/>
        <script src="https://kit.fontawesome.com/7307532b1d.js" crossorigin="anonymous"></script>
        <title>Mystical Odour: LC</title>
        <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
    </head>
    <body class="antialiased">
       <div id='root'></div>
    </body>
    <script src="{{ mix('/js/app.js') }}"></script>
</html>
