import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";

actor {
  type Lead = {
    name : Text;
    email : Text;
  };

  type Product = {
    id : Text;
    name : Text;
    tagline : Text;
    price : Text;
    badge : Text;
    category : Text;
    imageUrl : Text;
  };

  module Lead {
    public func compare(lead1 : Lead, lead2 : Lead) : Order.Order {
      Text.compare(lead1.email, lead2.email);
    };
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Text.compare(p1.id, p2.id);
    };
  };

  let leads = Map.empty<Text, Lead>();
  let products = Map.empty<Text, Product>();

  public shared ({ caller }) func addLead(name : Text, email : Text) : async () {
    let lead : Lead = { name; email };
    leads.add(email, lead);
  };

  public query ({ caller }) func getLead(email : Text) : async Lead {
    switch (leads.get(email)) {
      case (null) { { name = ""; email = "" } };
      case (?lead) { lead };
    };
  };

  public query ({ caller }) func getAllLeads() : async [Lead] {
    leads.values().toArray().sort();
  };

  public shared ({ caller }) func addProduct(id : Text, name : Text, tagline : Text, price : Text, badge : Text, category : Text, imageUrl : Text) : async () {
    let product : Product = {
      id;
      name;
      tagline;
      price;
      badge;
      category;
      imageUrl;
    };
    products.add(id, product);
  };

  public shared ({ caller }) func updateProduct(id : Text, name : Text, tagline : Text, price : Text, badge : Text, category : Text, imageUrl : Text) : async Bool {
    switch (products.get(id)) {
      case (null) { false };
      case (?_) {
        let updatedProduct : Product = {
          id;
          name;
          tagline;
          price;
          badge;
          category;
          imageUrl;
        };
        products.add(id, updatedProduct);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Text) : async Bool {
    let existed = products.containsKey(id);
    products.remove(id);
    existed;
  };

  public query ({ caller }) func getProduct(id : Text) : async ?Product {
    products.get(id);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public shared ({ caller }) func seedProducts(newProducts : [Product]) : async Bool {
    if (products.size() > 0) {
      return false;
    };

    for (product in newProducts.values()) {
      products.add(product.id, product);
    };
    true;
  };

  public query ({ caller }) func adminLogin(password : Text) : async Bool {
    password == "Alex@thomas2026";
  };
};
