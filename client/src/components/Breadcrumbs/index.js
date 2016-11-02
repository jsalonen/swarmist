import React from 'react';
import Breadcrumbs from 'react-breadcrumbs';

export const MyBreadcrumbs = (props) => (
  <Breadcrumbs 
    hideNoPath={true}
    wrapperClass="breadcrumbs"
    itemClass="breadcrumb"
    routes={props.routes}
    params={props.params}
  />
)

export default MyBreadcrumbs;
