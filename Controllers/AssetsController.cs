using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EnterpriseAssetAPI.Models;
using EnterpriseAssetAPI.Data;

namespace EnterpriseAssetAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AssetsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var assets = await _context.Assets.ToListAsync();
            return Ok(assets);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Asset newAsset)
        {
            _context.Assets.Add(newAsset);
            await _context.SaveChangesAsync(); 
            return Ok(new { Message = "Asset Berhasil Didaftarkan ke Database!", Data = newAsset });
        }

        [HttpPost("bulk")]
        public async Task<IActionResult> PostBulk(List<Asset> newAssets)
        {
            _context.Assets.AddRange(newAssets);
            await _context.SaveChangesAsync(); 
            return Ok(new { Message = $"{newAssets.Count} Aset Berhasil Didaftarkan Sekaligus!" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Asset updatedAsset)
        {
            var asset = await _context.Assets.FindAsync(id);
            if (asset == null) 
                return NotFound(new { Message = "Aset IT tidak ditemukan" });

            asset.Name = updatedAsset.Name;
            asset.Category = updatedAsset.Category;
            asset.SerialNumber = updatedAsset.SerialNumber;
            asset.Status = updatedAsset.Status;
            asset.LastChecked = DateTime.Now;

            await _context.SaveChangesAsync(); 
            return Ok(new { Message = "Status Aset IT berhasil diperbarui!", Data = asset });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var asset = await _context.Assets.FindAsync(id);
            if (asset == null) 
                return NotFound(new { Message = "Aset IT tidak ditemukan" });

            _context.Assets.Remove(asset);
            await _context.SaveChangesAsync();
            return Ok(new { Message = $"Aset IT dengan ID {id} telah dihapus dari sistem." });
        }
    }
}