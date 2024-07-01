FROM php:7.4-cli

# Definir o diretório de trabalho
WORKDIR /var/www

# Instalar dependências do sistema e extensões PHP necessárias
RUN apt-get update && \
    apt-get install -y libzip-dev git unzip curl && \
    docker-php-ext-install zip

# Instalar Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');"

# Ajustar o tempo limite do Composer
RUN php composer.phar config --global process-timeout 2000

# Criar um usuário não-root
RUN useradd -m appuser
USER appuser
WORKDIR /home/appuser

# Criar projeto Laravel no diretório correto
RUN /var/www/composer.phar create-project --prefer-dist laravel/laravel /home/appuser/laravel

# Ajustar permissões
USER root
RUN chown -R appuser:appuser /home/appuser/laravel

USER appuser
WORKDIR /home/appuser/laravel

# Expor a porta e iniciar o servidor
EXPOSE 8000
ENTRYPOINT [ "php", "artisan", "serve" ]
CMD [ "--host=0.0.0.0" ]

