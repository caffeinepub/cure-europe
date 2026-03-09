import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";

actor {
  type Lead = {
    name : Text;
    email : Text;
  };

  module Lead {
    public func compare(lead1 : Lead, lead2 : Lead) : Order.Order {
      Text.compare(lead1.email, lead2.email);
    };
  };

  let leads = Map.empty<Text, Lead>();

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
};
