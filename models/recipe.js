module.exports = function(sequelize, DataTypes){
    var Recipe = sequelize.define("Recipe", { //Recipe is TABLE name
        // Name
        recipe_url:{ 
          type: DataTypes.STRING(2083)
        },

        recipe_image_url:{ 
          type: DataTypes.STRING(2083)
        },

        recipe_serving_size:{ 
          type: DataTypes.STRING
        },

        recipe_name:{ 
          type: DataTypes.STRING
        },

        recipe_notes:{ 
          type: DataTypes.TEXT
        },

        recipe_checkbox:{
            type: DataTypes.BOOLEAN
        }

      });

      Recipe.associate = function(models) {
        // We're saying that a Recipe should belong to an User
        // A Recipe can't be created without an User due to the foreign key constraint
        Recipe.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });

        Recipe.hasMany(models.Ingredient, {
          onDelete: "cascade"
        });

        Recipe.hasMany(models.Instruction, {
          onDelete: "cascade"
        });

        Recipe.hasMany(models.Tag, {
          onDelete: "cascade"
        });
      };

      return Recipe;
};