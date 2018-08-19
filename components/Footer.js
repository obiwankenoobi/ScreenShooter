import Link from 'next/link'


const Footer = () => (
    <footer className='footer'>
    <p className='footer-p'>built with <span role="img" aria-label="thinking"> ❤️ </span> by <a target='_blank' className='a-gh' href='https://github.com/obiwankenoobi'>@obiwankenoobi</a></p>
    {style}
    </footer>
)

const style = (
    <style jsx>
        {`
            .footer {
                width:100%;
                height:50px;
                background-color:#161616;
                position:absolute;
                bottom:0px;
                text-align:center;
            }

            .footer-p {
                color:white;
                margin-top:12px;
                margin-bototm:auto;
            }

            .a-gh:hover {
                color:#b1d0c2;
                text-decoration:none;
            }

            a:hover {
                text-decoration:none;
            }

            .a-gh {
                color:white!important;
                text-decoration:none;
                transition:0.5s;
            }
        `}
    </style>
)

export default Footer