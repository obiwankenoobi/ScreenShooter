import Layout from '../components/Layout.js'


export default () => (
    <Layout>
        <div className='docs-content align-center'>
            <h1 className='title'>docs</h1>
            <div>
                <p>
                    the API works by sending <code className='code'>GET</code> request to the server with <code>device</code> and <code>url</code> as query parameter.
                </p>

                <code className='code code-curl'>
                    curl https://screenshooterapi.herokuapp.com/screenshot?url=github.com&device=desktop
                </code>
                <br/>
                <br/>
                <p>
                    in response you will get a link to your screenshot and you'll be able to access the image in any time
                </p>
            </div>
            <div className='response'>
                <code>
                    &#123; 
                </code>
                <br/>
                <code>
                    &emsp; &emsp; link:"https://screenshooterapi.herokuapp.com/getscreenshot/github-phone-1534523667970.png",
                </code>
                <br/>
                <code>
                    &emsp; &emsp; name:"github-phone-1534523667970.png"                
                </code>
                <br/>
                <code>
                    &#125; 
                </code> 
            </div>
            <br/>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">description</th>
                        <th scope="col">options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"><code>endpoint</code></th>
                        <td><code>https://screenshooterapi.herokuapp.com/screenshot?</code></td>
                        <td className='text-center'></td>
                    </tr>
                    <tr>
                        <th scope="row"><code>url</code></th>
                        <td>the url of the site you want to take a screenshot of</td>
                        <td>any legal url</td>
                    </tr>
                    <tr>
                        <th scope="row"><code>device</code></th>
                        <td>the ratio of the screenshot</td>
                        <td><code>phone</code> / <code>desktop</code></td>
                    </tr>
                </tbody>
            </table>
        </div>
        {style}
    </Layout>
)

const style = (
    <style jsx="true">
        {`
            .code-curl {
                padding:1rem;
            }

            .title {
                margin-top:0.5rem;
            }

            .response {
                background-color:#f5f5f5;
                border-radius:10px;
                padding:10px;
                width:100%;
            }
            
            .code { 
                background: #f5f5f5; 
                border-radius:10px;

            }

            .align-center {
                margin-left:auto;
                margin-right:auto;
                
            }

            @media (min-width:1200px) {
                .docs-content {
                    width:70%;
                }
            }

            @media (min-width:991px) {
                .docs-content {
                    width:80%;
                }
            }



            .center { 
                justify-content: center; 
            }
        `}
    </style>
)