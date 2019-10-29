import React from 'react';
import Head from 'next/head';

import { connect } from 'react-redux';
import actions from '../src/actions';

import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/LIstItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";

import Icon from "@mdi/react";
import { mdiCheck, mdiMenu, mdiAccount, mdiInformation, mdiLogin } from "@mdi/js";

import MemberTable from "../components/memberTable";
import MemberShowTable from "../components/memberShowTable";
import PopupMessage from "../components/popupMessageDialog";
import AboutDialog from "../components/aboutDialog";

export default connect(state => state, dispatch => ({
  selectGrade: id => dispatch(actions.step1.selectGrade(id)),
  selectClass: id => dispatch(actions.step1.selectClass(id)),
  openWarnNoGradeOrClassDialog: () => dispatch(actions.step1.warnNoGradeOrClass(true)),
  closeWarnNoGradeOrClassDialog: () => dispatch(actions.step1.warnNoGradeOrClass(false)),

  openAddMemberDialog: () => dispatch(actions.step2.openAddMemberDialog()),
  closeAddMemberDialog: () => dispatch(actions.step2.closeAddMemberDialog()),
  submitAndCloseDialog: (name, sex, reason) => dispatch(actions.step2.submitAndCloseDialog(name, sex, reason)),
  deleteMember: id => dispatch(actions.step2.deleteMember(id)),

  submitList: () => dispatch(actions.step3.submitList()),

  increaseStep: () => dispatch(actions.increaseStep()),
  decreaseStep: () => dispatch(actions.decreaseStep()),
  backToHeadStep: () => dispatch(actions.backToHeadStep()),

  openDrawer: () => dispatch(actions.openDrawer()),
  closeDrawer: () => dispatch(actions.closeDrawer()),

  openAboutDialog: () => dispatch(actions.openAboutDialog()),
  closeAboutDialog: () => dispatch(actions.closeAboutDialog())
}))(props => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  const classes = makeStyles(theme => ({
    drawerList: {
      width: 240
    },
    divider: {
      marginTop: 10,
      marginBottom: 10
    },
    center: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    },
    centerRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row"
    },
    fillWidth: {
      width: "80%"
    },
    formControl: {
      width: 100
    },
    margin: {
      margin: 10
    }
  }))();

  return ([
    <Head>
      <title>晨检上报系统</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>,
    <div className={classnames(classes.center)}>
      <AboutDialog open={props.aboutDialogOpen} onClose={props.closeAboutDialog} />
      <Drawer
        anchor="left"
        open={props.drawerOpen}
        onClose={props.closeDrawer}
      >
        <List className={classes.drawerList}>
          <CardHeader
            avatar={
              <Icon path={mdiAccount} size={1} />
            }
            title="公共模式"
            subheader="当前无管理权限"
          />
          <Divider className={classes.divider} />
          <ListItem button>
            <ListItemIcon>
              <Icon path={mdiLogin} size={1} />
            </ListItemIcon>
            <ListItemText primary={"管理员登录"} />
          </ListItem>
          <ListItem button onClick={props.openAboutDialog}>
            <ListItemIcon>
              <Icon path={mdiInformation} size={1} />
            </ListItemIcon>
            <ListItemText primary={"关于"} />
          </ListItem>
        </List>
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={props.openDrawer}>
            <Icon path={mdiMenu} size={1} color="white" />
          </IconButton>
          <Typography variant="h6" className={classes.margin}>
            晨检上报系统
          </Typography>
        </Toolbar>
      </AppBar>
      <Stepper activeStep={props.activeStep} alternativeLabel>
        {["选择上报班级", "填写上报情况", "提交结果"].map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classnames(classes.fillWidth, classes.center)}>
        <PopupMessage
          open={props.warnNoGradeOrClassDialog}
          onClose={props.closeWarnNoGradeOrClassDialog}
          text="请选择完整的班级！"
        />
        {props.activeStep === 0 && (
          <Paper
            className={classnames(
              classes.centerRow,
              classes.fillWidth,
              classes.card
            )}
          >
            <FormControl
              className={classnames(classes.formControl, classes.margin)}
            >
              <InputLabel>年级</InputLabel>
              <Select value={props.grade} onChange={e => props.selectGrade(e.target.value)}>
                <MenuItem value={1}>高一</MenuItem>
                <MenuItem value={2}>高二</MenuItem>
                <MenuItem value={3}>高三</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              className={classnames(classes.formControl, classes.margin)}
            >
              <InputLabel>班级</InputLabel>
              <Select value={props.classId} onChange={e => props.selectClass(e.target.value)}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        )}
        {props.activeStep === 1 && (
          <MemberTable
            dialogOpen={props.dialogOpen}
            setDialogOpen={props.openAddMemberDialog}
            setDialogClose={props.closeAddMemberDialog}
            addMember={props.submitAndCloseDialog}
            removeMember={props.deleteMember}
            studentList={props.studentList}
          />
        )}
        {props.activeStep === 2 && (
          <Paper
            className={classnames(
              classes.center,
              classes.fillWidth,
              classes.card
            )}
          >
            {props.submitState === 'loading' && [
              <Typography className={classes.margin} variant="body1">
                正在提交
              </Typography>,
              <CircularProgress className={classes.margin} />
            ]}
            {props.submitState === 'success' && [
              <Typography className={classes.margin} variant="body1">
                提交成功
              </Typography>,
              <Icon className={classes.margin} path={mdiCheck} size={2} />
            ]}
            {props.submitState === 'fail' && [
              <Typography className={classes.margin} variant="body1">
                提交失败
              </Typography>,
              <Icon className={classes.margin} path={mdiClose} size={2} />
            ]}

            {props.fetchLatestState === 'loading' && [
              <Typography className={classes.margin} variant="body1">
                正在获取最近上报的记录列表
              </Typography>,
              <CircularProgress className={classes.margin} />
            ]}
            {props.fetchLatestState === 'success' && <MemberShowTable list={props.fetchLatestList} />}
            {props.fetchLatestState === 'fail' && [
              <Typography className={classes.margin} variant="body1">
                获取上报列表失败
              </Typography>,
              <Icon className={classes.margin} path={mdiClose} size={2} />
            ]}
          </Paper>
        )}
        {props.activeStep !== 2 && (
          <div className={classes.centerRow}>
            <Button
              disabled={props.activeStep === 0}
              onClick={() =>
                props.decreaseStep()
              }
              className={classes.margin}
            >
              上一步
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (props.activeStep === 0) {
                  if (!(props.classId && props.grade)) {
                    props.openWarnNoGradeOrClassDialog();
                    return;
                  }
                }
                else if (props.activeStep === 1) props.submitList();
                props.increaseStep();
              }}
              className={classes.margin}
            >
              下一步
            </Button>
          </div>
        )}
        {props.activeStep === 2 && props.submitState !== "done" && (
          <Button className={classes.margin} onClick={props.backToHeadStep}>
            返回至开始位置
          </Button>
        )}
      </div>
    </div>
  ]);
});
