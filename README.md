Instalación de los paquetes para websocket

1 - Instalar Stompjs
npm i @stomp/stompjs --save

2 - Instalar cliente
npm i sockjs-client --save 

3 - Instalar los tipos
npm i @types/sockjs-client --save-dev

4 - Configurar variable global para sockets en archivo "polyfills.ts"
(window as any).global = window;