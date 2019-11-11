import React from 'react';
import Head from 'next/head';

import { connect } from 'react-redux';

import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import { pages, dialogs, views } from '../src/connector';

export default connect(state => state, dispatch => ({}))(props => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return ([
    <Head>
      <title>晨检上报系统</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>,
    <>
      {Object.keys(views).map((n, index) => <div key={index}>{React.createElement(views[n])}</div>)}
      {Object.keys(dialogs).map((n, index) => <div key={index}>{React.createElement(dialogs[n])}</div>)}
      {React.createElement(pages[props.renderPage])}
    </>
  ]);
});
