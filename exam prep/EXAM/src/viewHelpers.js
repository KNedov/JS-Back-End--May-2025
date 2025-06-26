export default{
        setTitle(title){
            this.pageTitle=title
        },
            showIngredients(ingredients){
       return ingredients.replaceAll(', ',' / ')
  
    },
    count(elements){
        return elements.length
    },
  
    }