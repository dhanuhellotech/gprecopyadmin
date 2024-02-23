import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import MainLayout from './../layout/MainLayout';
import Enquiry from '../views/Enquiry/Enquiry.jsx';
import DashboardDefault from '../views/dashboard/Default';
import TableBasic from '../views/forms/tables/TableBasic';
import TableDense from '../views/forms/tables/TableDense';
import UtilsTypography from '../views/utilities/typography';
import UtilsColor from '../views/utilities/color';
import UtilsShadow from '../views/utilities/shadow';
import UtilsMaterialIcons from '../views/utilities/icons/MaterialIcons';
import UtilsTablerIcons from '../views/utilities/icons/TablerIcons';
import SamplePage from '../views/sample-page';
import Admission from '../views/admission/Admission.jsx';
import Franchise from '../views/franchise/Franchise.jsx';
import Contact from '../views/contact/Contact.jsx';
import Event from '../views/Events/Events.jsx';
import Blog from '../views/blogs/Blog.jsx';
import Address from '../views/address/Address.jsx'
import Calendar from '../views/calendar/Calendar.jsx';
import Teacher from '../views/teachers/Teacher.jsx';
import Newsletter from '../views/newletter/Newsletter.jsx';
import Class from '../views/summerclass/Class.jsx';
import TimeTable from '../views/timetable/TimeTable.jsx';
import Topbar from '../views/topbar/Topbar.jsx';

const MainRoutes = () => {
  const location = useLocation();
  const isAuthenticated = true; // Replace with your authentication logic

  return (
    <Route
      path={[
        '/dashboard/default',
        '/tables/tbl-basic',
        '/tables/tbl-dense',
        '/utils/util-typography',
        '/utils/util-color',
        '/utils/util-shadow',
        '/icons/tabler-icons',
        '/icons/material-icons',
        '/sample-page',
        '/Admission',
        '/enquiry',
        '/franchise',
        '/events',
        '/contact',
        '/blog',
        '/address',
        '/calendar',
        '/teacher',
        '/newsletter',
        '/class',
        '/timetable',
        '/topbar'
      ]}
    >
      <MainLayout showBreadcrumb={true}>
        <Switch location={location} key={location.pathname}>
          <Route path="/dashboard/default" component={DashboardDefault} />
          <Route path="/tables/tbl-basic" component={TableBasic} />
          <Route path="/tables/tbl-dense" component={TableDense} />
          <Route path="/utils/util-typography" component={UtilsTypography} />
          <Route path="/utils/util-color" component={UtilsColor} />
          <Route path="/utils/util-shadow" component={UtilsShadow} />
          <Route path="/icons/tabler-icons" component={UtilsTablerIcons} />
          <Route path="/icons/material-icons" component={UtilsMaterialIcons} />
          <Route path="/sample-page" component={SamplePage} />
          <Route path="/Admission" component={Admission} />
          <Route path="/blog" component={Blog} />
          <Route path="/enquiry" component={Enquiry} />
          <Route path="/franchise" component={Franchise} />
          <Route path="/contact" component={Contact} />
          <Route path="/events" component={Event} />
          <Route path="/address" component={Address} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/teacher" component={Teacher} />
          <Route path="/newsletter" component={Newsletter} />
          <Route path="/class" component={Class} />
          <Route path="/timetable" component={TimeTable} />
          <Route path="/topbar" component={Topbar} />
        </Switch>
      </MainLayout>
    </Route>
  );
};

export default MainRoutes;
