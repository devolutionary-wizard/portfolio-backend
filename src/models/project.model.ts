import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  Length,
  Index,
} from "sequelize-typescript";

interface ProjectAttributes {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> { }

@Table({
  timestamps: true,
  tableName: "projects",
  modelName: "Project",
})
export default class Project extends Model<
  ProjectAttributes,
  ProjectCreationAttributes
> {
  @Index
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Length({ min: 3, max: 30 })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Length({ min: 3, max: 100 })

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare imageUrl: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
