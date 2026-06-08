using System.Text.Json;
using HiringPlatform.Configuration;
using HiringPlatform.Interfaces;
using HiringPlatform.Models;
using Microsoft.Extensions.Options;

namespace HiringPlatform.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly string _filePath;
        private readonly JsonSerializerOptions _readOptions;
        private readonly JsonSerializerOptions _writeOptions;

        public UserRepository(IOptions<AppSettings> settings)
        {
             // REFACTORED: Path now comes from appsettings.json via IOptions (Configuration Management)
            // OLD CODE (hardcoded path — code smell: Magic String):
            // private readonly string _filePath = "Data/users.json";
            _filePath = Path.Combine(
                Directory.GetCurrentDirectory(),
                settings.Value.DataDirectory,
                settings.Value.UsersFile
            );

            // Fix — camelCase for both read and write to stay consistent
           _readOptions = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true
};
_writeOptions = new JsonSerializerOptions
{
    WriteIndented = true
};
        }
         // REFACTORED: Extracted ReadAll() and WriteAll() as private methods (Extract Method refactoring)
        // OLD CODE (duplicated read logic in every method — code smell: Duplicated Code):
        // public List<User> GetAll()
        // {
        //     var json = File.ReadAllText("Data/users.json");
        //     return JsonSerializer.Deserialize<List<User>>(json) ?? new List<User>();
        // }
        // public User? GetById(string id)
        // {
        //     var json = File.ReadAllText("Data/users.json");
        //     var users = JsonSerializer.Deserialize<List<User>>(json) ?? new List<User>();
        //     return users.FirstOrDefault(u => u.Id == id);
        // }

        private List<User> ReadAll()
        {
            if (!File.Exists(_filePath)) return new List<User>();
            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<User>>(json, _readOptions) ?? new List<User>();
        }

        private void WriteAll(List<User> users)
        {
            File.WriteAllText(_filePath, JsonSerializer.Serialize(users, _writeOptions));
        }

        public List<User> GetAll() => ReadAll();
        public User? GetById(string id) => ReadAll().FirstOrDefault(u => u.Id == id);
        public User? GetByEmail(string email) => ReadAll().FirstOrDefault(u => u.Email == email);

        public void Add(User user)
        {
            var users = ReadAll();
            users.Add(user);
            WriteAll(users);
        }

        public void Update(User user)
        {
            var users = ReadAll();
            var index = users.FindIndex(u => u.Id == user.Id);
            if (index >= 0) { users[index] = user; WriteAll(users); }
        }

        public void Delete(string id)
        {
             // REFACTORED: Inline LINQ filter (Simplify Expression refactoring)
            // OLD CODE (verbose loop — code smell: Unnecessarily complex logic):
            // var users = ReadAll();
            // var updated = new List<User>();
            // foreach (var u in users)
            // {
            //     if (u.Id != id)
            //         updated.Add(u);
            // }
            // WriteAll(updated);
            WriteAll(ReadAll().Where(u => u.Id != id).ToList());
        }
    }
}