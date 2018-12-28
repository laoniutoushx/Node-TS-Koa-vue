(async function(){
    const Sequelize = require('sequelize');

    const sequelize = new Sequelize('test', 'root', '2012', {
        host: '127.0.0.1',
        dialect: 'mysql',
        define: {
            timestamps: false
        }
    });
    
    sequelize.authenticate().then(() => {
        console.info('链接成功');
    }).catch(err => {
        console.info('链接失败');
    });
    
    // 定义模型
    
    const Users = sequelize.define('Users', {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        age: {
            type: Sequelize.INTEGER(2),
            allowNull: true,
        },
        gender: {
            type: Sequelize.STRING(10),
            allowNull: true,
        }
    });

    // let nagato = Users.build({
    //     username: 'nagato',
    //     age: 20,
    //     gender: '女'
    // });
    
    // await nagato.save();

    // findOne
    Users.findOne({
        where: {
            // username: 'haruhi'
            /**  等于 */
            // username: {
            //     [Sequelize.Op.eq]: 'haruhi'
            // }
            /**  年龄 大于等于 */
            // age: {
            //     [Sequelize.Op.gte]: 3
            // }
            /** 多条件 */
            // [Sequelize.Op.or]: [
            //     {
            //         age: {
            //             [Sequelize.Op.gt]: 10
            //         }
            //     },
            //     {
            //         gender: {
            //             [Sequelize.Op.eq]: '女'
            //         }
            //     },
            // ]
        }
    }).then(rs => {
        console.info(JSON.stringify(rs));
    });

    // finaAll
    Users.findAll({
        order: [
            ['age', 'desc'],
            ['id', 'desc'],
        ]
    }).then(users => {
        users.forEach(user => {console.info(user.id, user.username, user.age, user.gender)});
    });

})();


