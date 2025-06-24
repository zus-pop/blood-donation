import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";

const BloodInfo = () => {
  const bloodTypeNeeds = [
    { type: "O-", status: "Critical Need", color: "bg-red-500" },
    { type: "O+", status: "High Need", color: "bg-orange-500" },
    { type: "A-", status: "Moderate Need", color: "bg-yellow-500" },
    { type: "A+", status: "Stable", color: "bg-green-500" },
    { type: "B-", status: "High Need", color: "bg-orange-500" },
    { type: "B+", status: "Moderate Need", color: "bg-yellow-500" },
    { type: "AB-", status: "Stable", color: "bg-green-500" },
    { type: "AB+", status: "Stable", color: "bg-green-500" },
  ];

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Current Blood Supply
          </h2>
          <p className="text-muted-foreground">
            These blood types are currently needed in our community
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bloodTypeNeeds.map((blood) => (
            <Link
              key={blood.type}
              to="/blood-infos"
              state={{ selectedBloodType: blood.type }}
              className="block transition-transform hover:scale-105"
            >
              <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl font-bold">
                    {blood.type}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button className="bg-red-600 hover:bg-red-700">
            <Link to="blood-infos">Find Your Blood Type</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BloodInfo;
