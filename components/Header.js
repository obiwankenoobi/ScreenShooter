import Link from 'next/link'


const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div className='header-container'>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/docs">
          <a style={linkStyle}>docs</a>
        </Link>
        {style}
    </div>
)

const style = (
  <style jsx>
    {`
      .header-container {
        margin-left:20px;
      }

      .github-button-div {
        padding-top:15px!important;
        display:inline
      }
    `}
  </style>
)

export default Header