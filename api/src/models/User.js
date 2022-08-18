const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		// id_professional: {
		// 	type: DataTypes.INTEGER,
		// 	//allowNull: false,
		// },
		name: {
			type: DataTypes.STRING,
			//allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			//allowNull: false
		},
		mail: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		dni: {
			type: DataTypes.INTEGER,
			unique: true,
			allowNull: false
		},
		phone: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false
		},
		province: {
			type: DataTypes.STRING,
			allowNull: false
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false
		},
		coordinate: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false
		},
		
		jobs: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
		plan_premium: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		rating: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0,
			validate: {
				min:0,
				max:5
			},
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},

	}, {
		timestamps: false
	});
};
