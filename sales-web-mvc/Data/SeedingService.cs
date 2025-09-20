using SalesWebMvc.Models;
using SalesWebMvc.Models.Enums;

namespace SalesWebMvc.Data
{
    public class SeedingService
    {
        private SalesWebMvcContext _context;

        public SeedingService(SalesWebMvcContext context)
        {
            _context = context;
        }

        public void Seed()
        {
            if (_context.Department.Any() ||
                _context.Seller.Any() ||
                _context.SalesRecord.Any())
            {
                return;
            }

            Department d1 = new("Computers");
            Department d2 = new("Electronics");
            Department d3 = new ("Fashion");
            Department d4 = new( "Books");


            Seller s1 = new( "Bob Brown", "bob@email.com", new DateTime(1998, 4, 21, 0, 0, 0, 0, DateTimeKind.Utc), 1000.00, d1);
            Seller s2 = new( "Maria Green", "maria@gmail.com", new DateTime(1979, 12, 31, 0, 0, 0, 0, DateTimeKind.Utc), 3500.0, d2);
            Seller s3 = new( "Alex Grey", "alex@gmail.com", new DateTime(1988, 1, 15, 0, 0, 0, 0, DateTimeKind.Utc), 2200.0, d1);
            Seller s4 = new( "Martha Red", "martha@gmail.com", new DateTime(1993, 11, 30, 0, 0, 0, 0, DateTimeKind.Utc), 3000.0, d4);
            Seller s5 = new( "Donald Blue", "donald@gmail.com", new DateTime(2000, 1, 9, 0, 0, 0, 0, DateTimeKind.Utc), 4000.0, d3);
            Seller s6 = new( "Alex Pink", "bob@gmail.com", new DateTime(1997, 3, 4, 0, 0, 0, 0, DateTimeKind.Utc), 3000.0, d2);

            SalesRecord r1 = new( new DateTime(2018, 09, 25, 0, 0, 0, 0, DateTimeKind.Utc), 11000.0, SaleStatus. Faturado, s1);
            SalesRecord r2 = new( new DateTime(2018, 09, 4, 0, 0, 0, 0, DateTimeKind.Utc), 7000.0, SaleStatus. Faturado, s5);
            SalesRecord r3 = new( new DateTime(2018, 09, 13, 0, 0, 0, 0, DateTimeKind.Utc), 4000.0, SaleStatus.Cancelado, s4);
            SalesRecord r4 = new( new DateTime(2018, 09, 1, 0, 0, 0, 0, DateTimeKind.Utc), 8000.0, SaleStatus. Faturado, s1);
            SalesRecord r5 = new(new DateTime(2018, 09, 21, 0, 0, 0, 0, DateTimeKind.Utc), 3000.0, SaleStatus. Faturado, s3);
            SalesRecord r6 = new(new DateTime(2018, 09, 15, 0, 0, 0, 0, DateTimeKind.Utc), 2000.0, SaleStatus. Faturado, s1);
            SalesRecord r7 = new(new DateTime(2018, 09, 28, 0, 0, 0, 0, DateTimeKind.Utc), 13000.0, SaleStatus. Faturado, s2);
            SalesRecord r8 = new(new DateTime(2018, 09, 11, 0, 0, 0, 0, DateTimeKind.Utc), 4000.0, SaleStatus. Faturado, s4);
            SalesRecord r9 = new(new DateTime(2018, 09, 14, 0, 0, 0, 0, DateTimeKind.Utc), 11000.0, SaleStatus.Pendente, s6);
            SalesRecord r10 = new(new DateTime(2018, 09, 7, 0, 0, 0, 0, DateTimeKind.Utc), 9000.0, SaleStatus. Faturado, s6);
            SalesRecord r11 = new(new DateTime(2018, 09, 13, 0, 0, 0, 0, DateTimeKind.Utc), 6000.0, SaleStatus. Faturado, s2);
            SalesRecord r12 = new( new DateTime(2018, 09, 25, 0, 0, 0, 0, DateTimeKind.Utc), 7000.0, SaleStatus.Pendente, s3);
            SalesRecord r13 = new(new DateTime(2018, 09, 29, 0, 0, 0, 0, DateTimeKind.Utc), 10000.0, SaleStatus. Faturado, s4);
            SalesRecord r14 = new(new DateTime(2018, 09, 4, 0, 0, 0, 0, DateTimeKind.Utc), 3000.0, SaleStatus. Faturado, s5);
            SalesRecord r15 = new(new DateTime(2018, 09, 12, 0, 0, 0, 0, DateTimeKind.Utc), 4000.0, SaleStatus. Faturado, s1);
            SalesRecord r16 = new(new DateTime(2018, 10, 5, 0, 0, 0, 0, DateTimeKind.Utc), 2000.0, SaleStatus. Faturado, s4);
            SalesRecord r17 = new( new DateTime(2018, 10, 1, 0, 0, 0, 0, DateTimeKind.Utc), 12000.0, SaleStatus. Faturado, s1);
            SalesRecord r18 = new(new DateTime(2018, 10, 24, 0, 0, 0, 0, DateTimeKind.Utc), 6000.0, SaleStatus. Faturado, s3);
            SalesRecord r19 = new(new DateTime(2018, 10, 22, 0, 0, 0, 0, DateTimeKind.Utc), 8000.0, SaleStatus. Faturado, s5);
            SalesRecord r20 = new(new DateTime(2018, 10, 15, 0, 0, 0, 0, DateTimeKind.Utc), 8000.0, SaleStatus. Faturado, s6);
            SalesRecord r21 = new(new DateTime(2018, 10, 17, 0, 0, 0, 0, DateTimeKind.Utc), 9000.0, SaleStatus. Faturado, s2);
            SalesRecord r22 = new(new DateTime(2018, 10, 24, 0, 0, 0, 0, DateTimeKind.Utc), 4000.0, SaleStatus. Faturado, s4);
            SalesRecord r23 = new(new DateTime(2018, 10, 19, 0, 0, 0, 0, DateTimeKind.Utc), 11000.0, SaleStatus.Cancelado, s2);
            SalesRecord r24 = new(new DateTime(2018, 10, 12, 0, 0, 0, 0, DateTimeKind.Utc), 8000.0, SaleStatus. Faturado, s5);
            SalesRecord r25 = new(new DateTime(2018, 10, 31, 0, 0, 0, 0, DateTimeKind.Utc), 7000.0, SaleStatus. Faturado, s3);
            SalesRecord r26 = new(new DateTime(2018, 10, 6, 0, 0, 0, 0, DateTimeKind.Utc), 5000.0, SaleStatus. Faturado, s4);
            SalesRecord r27 = new(new DateTime(2018, 10, 13, 0, 0, 0, 0, DateTimeKind.Utc), 9000.0, SaleStatus.Pendente, s1);
            SalesRecord r28 = new(new DateTime(2018, 10, 7, 0, 0, 0, 0, DateTimeKind.Utc), 4000.0, SaleStatus. Faturado, s3);
            SalesRecord r29 = new(new DateTime(2018, 10, 23, 0, 0, 0, 0, DateTimeKind.Utc), 12000.0, SaleStatus. Faturado, s5);
            SalesRecord r30 = new(new DateTime(2018, 10, 12, 0, 0, 0, 0, DateTimeKind.Utc), 5000.0, SaleStatus. Faturado, s2);

          //  _context.Department.AddRange(d1, d2, d3, d4);

         //   _context.Seller.AddRange(s1, s2, s3, s4, s5, s6);

          //  _context.SalesRecord.AddRange(
         //       r1, r2, r3, r4, r5, r6, r7, r8, r9, r10,
        //        r11, r12, r13, r14, r15, r16, r17, r18, r19, r20,
        //        r21, r22, r23, r24, r25, r26, r27, r28, r29, r30
         //   );
        //    _context.SaveChanges();
        }
    }

}