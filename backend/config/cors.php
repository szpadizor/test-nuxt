<?php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://nuxt:3000',
    ],
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];
