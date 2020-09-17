import { Ingredient } from "src/app/shared/Ingredient.model";

export class Recipe{
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[];
    email: string;
    isPublic: boolean;

    constructor(name: string, description: string, imagePath: string, ingredients : Ingredient[], email:string, isPublic: boolean){
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.email = email;
        this.isPublic = isPublic;
    }
}