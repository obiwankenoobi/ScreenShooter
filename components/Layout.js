import Header from './Header'
import Footer from './Footer'
import Head from 'next/head';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
    <div>
        <Head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>

            <title>ScreenShooter</title>
        </Head>
        <Header/>
        <a href="https://github.com/obiwankenoobi/ScreenShooter" targer="_blank">
            <img 
            style={{position:'absolute', top: 0, right: 0, border: 0}}
            src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" 
            alt="Fork me on GitHub"/>
        </a>
        <div className='container'>
            {
                props.children // props.children is an object with all the components inside <Layout/>
            } 
        </div>
        <Footer/>
        {style}
    </div>

)

const style = (
    <style jsx>{`
        h1, a {
        font-family: "Arial";
        }

        ul {
        padding: 0;
        }

        li {
        list-style: none;
        margin: 5px 0;
        }

        a {
        text-decoration: none;
        color: blue;
        }

        a:hover {
        opacity: 0.6;
        }
    `}
    </style>
)



export default Layout