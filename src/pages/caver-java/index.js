import { withRouter } from 'react-router-dom';
import KasDocsNavBar from '../../components/Navbar'
import versions from '../../java.json'

const CaverJavaPage = (props) => {
    var version = props.match.params.version;
    if(!version || version === 'latest') {
        version = versions.latestVersion;
    }
    const url = `https://javadoc.io/static/xyz.groundx.caver/caver-java-ext-kas/${version}/index.html`;
    return (
        <>
            <KasDocsNavBar {...props} currentAPITitle='API References' currentSDKTitle='KAS SDK (Java)' />
            <div style={{marginTop:"56px"}}>
                <iframe title='caver-java-page' style={{display:'block', width:'100vw', height:'calc(100vh - 56px)'}} src={url} />
            </div>
        </>
    )
}

export default withRouter(CaverJavaPage);