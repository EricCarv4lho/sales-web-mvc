namespace SalesWebMvc.Models
{
    public class Department
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Seller> Sellers { get; set; } = new List<Seller>();


        public Department() { }

        public Department(string name)
        {
           
            Name = name;

        }

        public void AddSeller(Seller seller)
        {
            Sellers.Add(seller);
        }

        public double TotalSales(DateTime init, DateTime final)
        {
            return Sellers.Sum(s => s.TotalSales(init, final));

        }
    }
}
