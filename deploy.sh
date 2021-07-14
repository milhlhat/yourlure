#pull new code
git pull

#update node module
npm i

# Build reactjs app with production mode
npm run build

# Run static file at port 80
npm install -g serve
nohup serve -l 80 -s build &

