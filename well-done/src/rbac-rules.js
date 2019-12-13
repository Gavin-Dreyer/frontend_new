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
            "operators:list",
            "pump-info:list",
            "sensor-info:list",
            "pump-info:create",
            "sensor-info:create"
        ],
        dynamic:{
            //update userID and org owner IDs with foreign keys on Russ' new/ or Labs 17 E.Ps
            "organizations.edit":({userId,orgOwnerId})=>{
                if (!userId || !orgOwnerId) return false;
                return userId === orgOwnerId;
            },
            "sensor-info.edit":({orgId, sensorOwnerId})=>{
                if (!orgId || !sensorOwnerId) return false;
                return orgId === sensorOwnerId;
            },
            "pumps.edit":({orgId, pumpOwnerId})=>{
                if (!orgId || !pumpOwnerId) return false;
                return orgId === !pumpOwnerId;
            },
            "operators.edit":({orgId, opOrgId})=>{
                if (!orgId || !opOrgId) return false;
                return orgId === opOrgId;
            }
        }
    },

    operators:{
        static:[
            "dashboard-page:visit",
            "pump-info:get",
            "sensor-info:get"
        ]
    }
};

export default rules;