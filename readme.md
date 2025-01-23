# BOT DISCORD

### Instrucciones

1. Crear discord app de tipo bot, configurarlo, generar y guardar su token.  
2. Utilizando el enlace OAuth2 generado, conectar el bot al servidor discord.  
3. Instalar dependencias de este repositorio: `npm install`  
4. Editar renombrar `.env.example` a `.env` e ingresar el token de bot generado.  
5. Copiar script bash renombrandolo:  
`cp run_discordBot.sh.dist run_discordBot.sh`  
6. Dar permisos al script:  
`chmod u+rwx run_discordBot.sh`  
7. Ejecutar el bot con el script: ./run_discordBot.sh

8. (Opcional) Iniciar bot con el sistema:  
Linux:  
Ejecutar:  
`crontab -e`  
Agregar:  
`@reboot sleep 60; /bin/bash /home/ruta/a/run_discordBot.sh`

Discord bot by JeF