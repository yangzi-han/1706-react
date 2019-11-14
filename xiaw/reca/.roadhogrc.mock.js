import Mock from './mock/gov'

export default {
        'GET /api/main/govList':(req,res)=>{
            res.send(Mock)
        }
};
