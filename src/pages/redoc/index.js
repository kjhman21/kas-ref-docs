import { withRouter } from 'react-router-dom';
import { RedocStandalone } from 'redoc';
import KasDocsNavBar from '../../components/Navbar'

const RedocPage = (props) => {
    return (
        <>
            <KasDocsNavBar {...props} currentAPITitle={props.title} currentSDKTitle="SDK References" />
            <div style={{marginTop:"56px"}}>
                <RedocStandalone
                spec={props.spec}
                options={{
                    scrollYOffset:'.navbar',
                    nativeScrollbars: true,
                }}
                />
            </div>
        </>
    )
}

export default withRouter(RedocPage);