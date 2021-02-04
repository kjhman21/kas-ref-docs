import { Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import docs from '../../docs.json'
import javaVersions from '../../java.json';
import jsVersions from '../../js.json';

const KasDocsNavBar = (props) => {
  const paths = props.location.pathname.split('/');
  const lang = paths[1];
  const sitePrefix = process.env.REACT_APP_URL_PREFIX

  var enPaths = JSON.parse(JSON.stringify(paths))
  enPaths[1] = 'en'
  var koPaths = JSON.parse(JSON.stringify(paths))
  koPaths[1] = 'ko'

  const enPathUrl = sitePrefix + enPaths.join('/')
  const koPathUrl = sitePrefix + koPaths.join('/')

  var currentLanguage = "English"
  if(paths[1] === 'ko') {
    currentLanguage = "한국어"
  }

  var currentVersion = paths[paths.length-1];
  var currentAPI = paths[2];

  return (
    <Navbar fixed='top' bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={sitePrefix+"/images/kas-logo.svg"}
          height="30"
          className="d-inline-block align-top"
        />{' '}
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="https://docs.klaytnapi.com">Guide</Nav.Link>
        <NavDropdown title={props.currentAPITitle} id="basic-nav-dropdown">
          {
            docs.map(x=>{
              if(x.version==="latest" && x.lang === lang ) {
                var sp = x.targetPath.split('/');
                sp[1] = lang;
                return <NavDropdown.Item key={x.title} href={`${sitePrefix}${sp.join('/')}`}>{x.title}</NavDropdown.Item>
              } 
              return null;
            })
          }
        </NavDropdown>
        <NavDropdown title={props.currentSDKTitle} id="basic-nav-dropdown-sdk">
          <NavDropdown.Item href={sitePrefix+"/en/sdk/js/latest"}>KAS SDK (Javascript)</NavDropdown.Item>
          <NavDropdown.Item href={sitePrefix+"/en/sdk/java/latest"}>KAS SDK (Java)</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form inline>
        <Nav className="mr-auto">
          <NavDropdown title={currentVersion} id="basic-nav-dropdown-lang">
            {
              (paths[2] === "sdk") ?
                (paths[3] === "js") ?
                jsVersions.versions.map(x=>{
                  var targetPaths = JSON.parse(JSON.stringify(paths))
                  targetPaths[targetPaths.length-1] = x;
                  return <NavDropdown.Item key={x} href={`${sitePrefix}${targetPaths.join('/')}`}>{x}</NavDropdown.Item>
                })
                : javaVersions.versions.slice().reverse().map(x=>{
                  var targetPaths = JSON.parse(JSON.stringify(paths))
                  targetPaths[targetPaths.length-1] = x;
                  return <NavDropdown.Item key={x} href={`${sitePrefix}${targetPaths.join('/')}`}>{x}</NavDropdown.Item>
                })
              : docs.map(x=>{
                  if(x.lang === lang && x.api === currentAPI) {
                    return <NavDropdown.Item key={x.version} href={`${sitePrefix}${x.targetPath}`}>{x.version}</NavDropdown.Item>
                  }
                  return null;
                })
            }
          </NavDropdown>
          <NavDropdown title={currentLanguage} id="basic-nav-dropdown-lang">
            <NavDropdown.Item href={enPathUrl}>English</NavDropdown.Item>
            {paths[2] !== 'sdk' && <NavDropdown.Item href={koPathUrl}>한국어</NavDropdown.Item>}
          </NavDropdown>
        </Nav>
        <Button className='ml-3' href="https://console.klaytnapi.com" variant="light">KAS Console</Button>
      </Form>
    </Navbar>
  );
}

export default KasDocsNavBar;