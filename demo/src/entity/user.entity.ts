import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({
    length: 11,
    nullable: false
  })
  username: string;

  @Column({
    length: 255,
    nullable: false
  })
  password: string;  

  @Column({
    length: 255,
    nullable: false,
  })
  salt: string; 

  @Column('int',{
    nullable: true, 
    default: null 
  })
  level: number;   

  @Column('tinyint',{
    nullable: false, 
    default: 1
  })
  is_on_duty: number;  


  @Column(
    'datetime', { 
      nullable: false,
      name: 'last_login_time', 
      default: () => 'CURRENT_TIMESTAMP' }
  )
  last_login_time: Date;  
  
  
  @Column(
    'datetime', { 
      nullable: false,
      name: 'register_time', 
      default: () => 'CURRENT_TIMESTAMP' }
  )
  register_time: Date;   

  @Column({
    length: 255,
    nullable: true, 
    default: null 
  })
  openid: string;   
}


// uid: {
//   type: Sequelize.INTEGER(11), // 字段类型
//   allowNull: false, // 是否允许为NULL
//   primaryKey: true, // 字段是主键
//   autoIncrement: true, // 是否自增
// },
// username: {
//   type: Sequelize.STRING(11),
//   allowNull: false,
//   unique: true // 字段是否UNIQUE     
// },
// password: {
//   type: Sequelize.STRING(255),
//   allowNull: false,
// },    
// salt: {
//   type: Sequelize.STRING(255),
//   allowNull: false,
// },	
// level: {
//   type: Sequelize.INTEGER(11),
//   allowNull: true,
// },	
// is_on_duty: {
//   type: Sequelize.TINYINT(1),
//   allowNull: false,
//   defaultValue: 1
// },
// last_login_time: {
//   type: Sequelize.DATE,
//   allowNull: true
// },    
// register_time: {
//   type: Sequelize.DATE,
//   defaultValue: Sequelize.NOW,
//   allowNull: false,
//   get() {
//     return dayjs( this.getDataValue('registerTime') ).format('YYYY-MM-DD');
//   },
//   // field: 'register_time' // 数据库中字段的实际名称
// },
// openid: {
//   type: Sequelize.STRING(255),
//   allowNull: true,
// }