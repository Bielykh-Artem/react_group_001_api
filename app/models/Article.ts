import { Model, QueryBuilderType } from "objection";

export default class User extends Model {
  static get tableName() {
    return "article";
  }

  readonly id!: number;

  title: string;
  description: string;
  image_url: string;

  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;

  is_active: boolean;

  static modifiers = {
    defaultSelects(builder: QueryBuilderType<any>) {
      builder.select("id", "title", "description", "image_url", "created_at");
    },
  };
}
