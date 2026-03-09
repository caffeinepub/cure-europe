import List "mo:core/List";
import Map "mo:core/Map";

module {
  // Old Product type without imageUrls
  type OldProduct = {
    id : Text;
    name : Text;
    tagline : Text;
    price : Text;
    badge : Text;
    category : Text;
    imageUrl : Text;
  };

  // New Product type with imageUrls as List
  type NewProduct = {
    id : Text;
    name : Text;
    tagline : Text;
    price : Text;
    badge : Text;
    category : Text;
    imageUrl : Text;
    imageUrls : List.List<Text>;
  };

  type Lead = {
    name : Text;
    email : Text;
  };

  // Old and new Actor types just use products Map of appropriate types
  type OldActor = {
    leads : Map.Map<Text, Lead>;
    products : Map.Map<Text, OldProduct>;
  };

  type NewActor = {
    leads : Map.Map<Text, Lead>;
    products : Map.Map<Text, NewProduct>;
  };

  // Migration function
  public func run(old : OldActor) : NewActor {
    let newProducts = old.products.map<Text, OldProduct, NewProduct>(
      func(_, oldProduct) {
        { oldProduct with imageUrls = List.empty<Text>() };
      }
    );
    {
      leads = old.leads;
      products = newProducts;
    };
  };
};
