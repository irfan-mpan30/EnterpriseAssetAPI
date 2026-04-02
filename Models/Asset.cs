namespace EnterpriseAssetAPI.Models
{
    public class Asset
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string SerialNumber { get; set; } = string.Empty;
        public string Status { get; set; } = "Active";
        public DateTime LastChecked { get; set; } = DateTime.Now;
    }
}