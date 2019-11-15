import Mock from './mock/gov'

export default {
        'GET /api/main/govList':(req,res)=>{
            res.send(Mock)
        },
        'POST /api/main/addGov':(req,res)=>{
            Mock.list.push({
                id:Mock.list.lenght+1,
                ...req.body
            })
            res.send({
                code:1,
                msg:"添加成功"
            })
        },
        'DELETE /api/main/deleteGov':(req,res)=>{
            let index=Mock.list.findIndex(item=>item.id===req.body.id)
            Mock.list.splice(index,1);
            res.send({
                code:1,
                msg:"删除成功"
            })
        }
};
