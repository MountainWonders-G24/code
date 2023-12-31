'use client'
import React from 'react';
import "swagger-ui-react/swagger-ui.css"
import swaggerFile from '../../swagger.json';

import dynamic from "next/dynamic";

const DynamicSwaggerUI = dynamic(() => import("swagger-ui-react"), {
    ssr: false,
    loading: () => <p>Loading Component...</p>,
});

const AdminDocPage = () => {
    return <DynamicSwaggerUI spec={swaggerFile} />;
};

export default AdminDocPage;