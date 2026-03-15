import Map "mo:core/Map";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Text "mo:core/Text";
import Order "mo:core/Order";



actor {
  type Lead = {
    name : Text;
    email : Text;
  };

  // Internal product type with mutable list
  type Product = {
    id : Text;
    name : Text;
    tagline : Text;
    price : Text;
    badge : Text;
    category : Text;
    imageUrl : Text;
    imageUrls : List.List<Text>;
  };

  // Public-facing product type with immutable array
  type ProductView = {
    id : Text;
    name : Text;
    tagline : Text;
    price : Text;
    badge : Text;
    category : Text;
    imageUrl : Text;
    imageUrls : [Text];
  };

  type TouchdownGallery = {
    images : [Text];
    title : Text;
  };

  module Lead {
    public func compare(lead1 : Lead, lead2 : Lead) : Order.Order {
      Text.compare(lead1.email, lead2.email);
    };
  };

  module ProductView {
    public func compare(p1 : ProductView, p2 : ProductView) : Order.Order {
      Text.compare(p1.id, p2.id);
    };
  };

  let leads = Map.empty<Text, Lead>();
  let products = Map.empty<Text, Product>();

  var touchdownImages : [Text] = [];
  var touchdownTitle : Text = "Our Touchdowns";

  func toProductView(product : Product) : ProductView {
    {
      product with
      imageUrls = product.imageUrls.toArray();
    };
  };

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

  public shared ({ caller }) func addProduct(
    id : Text,
    name : Text,
    tagline : Text,
    price : Text,
    badge : Text,
    category : Text,
    imageUrl : Text,
    imageUrlsArray : [Text],
  ) : async () {
    let imageUrls = List.fromArray(imageUrlsArray);
    let product : Product = {
      id;
      name;
      tagline;
      price;
      badge;
      category;
      imageUrl;
      imageUrls;
    };
    products.add(id, product);
  };

  public shared ({ caller }) func updateProduct(
    id : Text,
    name : Text,
    tagline : Text,
    price : Text,
    badge : Text,
    category : Text,
    imageUrl : Text,
    imageUrlsArray : [Text],
  ) : async Bool {
    switch (products.get(id)) {
      case (null) { false };
      case (?_) {
        let imageUrls = List.fromArray(imageUrlsArray);
        let updatedProduct : Product = {
          id;
          name;
          tagline;
          price;
          badge;
          category;
          imageUrl;
          imageUrls;
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

  public query ({ caller }) func getProduct(id : Text) : async ?ProductView {
    switch (products.get(id)) {
      case (null) { null };
      case (?product) { ?toProductView(product) };
    };
  };

  public query ({ caller }) func getAllProducts() : async [ProductView] {
    let productArray = products.values().toArray();
    let productViewArray = productArray.map(
      toProductView
    );
    productViewArray.sort();
  };

  public shared ({ caller }) func seedProducts(newProducts : [ProductView]) : async Bool {
    if (products.size() > 0) {
      return false;
    };

    for (product in newProducts.values()) {
      let internalProduct : Product = {
        product with imageUrls = List.fromArray(product.imageUrls);
      };
      products.add(product.id, internalProduct);
    };
    true;
  };

  public shared ({ caller }) func setTouchdownGallery(images : [Text], title : Text) : async () {
    touchdownImages := images;
    touchdownTitle := title;
  };

  public query ({ caller }) func getTouchdownGallery() : async TouchdownGallery {
    { images = touchdownImages; title = touchdownTitle };
  };

  public query ({ caller }) func adminLogin(password : Text) : async Bool {
    password == "Alex@thomas2026";
  };
};
