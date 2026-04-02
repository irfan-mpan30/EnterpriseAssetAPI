using Microsoft.EntityFrameworkCore;
using EnterpriseAssetAPI.Models;

namespace EnterpriseAssetAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Asset> Assets { get; set; }
    }
}