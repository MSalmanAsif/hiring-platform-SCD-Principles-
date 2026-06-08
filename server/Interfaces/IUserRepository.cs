using HiringPlatform.Models;

namespace HiringPlatform.Interfaces
{
    // DIP — Controllers and Services depend on this abstraction
    // not on concrete implementation
    public interface IUserRepository
    {
        List<User> GetAll();
        User? GetById(string id);
        User? GetByEmail(string email);
        void Add(User user);
        void Update(User user);
        void Delete(string id);
    }
}