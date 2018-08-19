## ScreenShooter <span role="img" aria-label="camera">📸</span> <h3 className='title align-center'>RESTful api to take a screenshot of any site</h3>

# to use 
it can's get any simpler then that 

`curl https://screenshooterapi.herokuapp.com/screenshot?url=github.com&device=desktop`

`url` - the url of the site you want to capture

`device` - the ratio of the image you want. (`desktop` / `phone`)

# open source
the library is completely open sourced 
**to use it you must have Mongodb up and running** 
* clone the library `git clone https://github.com/obiwankenoobi/ScreenShooter.git`
* in [server/config](./server/config.js) change `server` property to `http://localhost:3000`
* `npm run dev`

# [try it!](https://screenshooterapi.herokuapp.com/)