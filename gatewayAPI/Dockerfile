# Use the official NGINX image
FROM nginx:alpine

# Remove the default NGINX config and use our own
COPY nginx.conf /etc/nginx/nginx.conf

# Copy our frontend files to NGINX's web root
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
