#pull new code
git pull

#update node module
npm i

# Build reactjs app with production mode
npm run build

# Run static file at port 5000
npm install -g serve
nohup serve -s build -l -5620

