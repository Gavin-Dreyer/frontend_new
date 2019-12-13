import Dashboard from "pages/Dashboard";

const rules ={
    visitor:{
        static:["dashboard-page:visit"]
    },

    admin:{
        static:[
            "dashboard-page:visit",
            "organizations:create",
            "organizations:get",
            "pump-info:get",
            "sensor-info:get",
            "pump-info:create",
            "sensor-info:create"
        ],
    },

    organizations:{
        static:[
            "dashboard-page:visit",
            "operators:create",
            "operators:get",
            "pump-info:get",
            "sensor-info:get",
            "pump-info:create",
            "sensor-info:create"
        ],
    },

    operators:{
        static:[
            "dashboard-page:visit",
            "pump-info:get",
            "sensor-info:get",
        ]
    }
};

export default rules;