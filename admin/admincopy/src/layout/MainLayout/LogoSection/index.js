import React from 'react';
import {Link,Typography} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

import config from './../../../config';

import logo from './../../../assets/images/logo.svg';

const LogoSection = () => {

    return (
        <React.Fragment>
            <Link component={RouterLink} to={config.defaultPath}>
                {/* <img src={logo} alt="Berry" width="100" /> */}
                <Typography variant="body2"  textTransform='capitalize'fontWeight= 'bold'>Gpreschool</Typography>
            </Link>
        </React.Fragment>
    );
};

export default LogoSection;
