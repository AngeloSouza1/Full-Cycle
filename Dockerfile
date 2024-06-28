# Use the latest official Nginx image from the Docker Hub
FROM nginx:latest

# Copy the content of the html directory to the default Nginx HTML directory
COPY html /usr/share/nginx/html

# Define the entrypoint script and the default command to run Nginx in the foreground
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

