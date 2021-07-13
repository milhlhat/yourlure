#pull new code
git pull
# Build reactjs app with production mode
npm run build

# Run static file at port 5000
npm install -g serve
serve -s build

