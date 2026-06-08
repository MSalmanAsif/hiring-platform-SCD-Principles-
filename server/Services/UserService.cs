using HiringPlatform.Interfaces;
using HiringPlatform.Models;

namespace HiringPlatform.Services
{
     // REFACTORED: Extracted all business logic from Controller into Service (SRP)
    // OLD CODE (business logic sitting inside Controller — code smell: Fat Controller):
    // [HttpPost("register")]
    // public IActionResult Register([FromBody] RegisterRequest req)
    // {
    //     var json = File.ReadAllText("Data/users.json");
    //     var users = JsonSerializer.Deserialize<List<User>>(json);
    //     if (users.Any(u => u.Email == req.Email))
    //         return BadRequest("Email exists");
    //     var user = new User { Id = Guid.NewGuid().ToString(), ... };
    //     users.Add(user);
    //     File.WriteAllText("Data/users.json", JsonSerializer.Serialize(users));
    //     return Ok(user);
    // }
    public class UserService
    {
        private readonly IUserRepository _userRepository;


        // REFACTORED: Dependency injected via constructor (DIP)
        // OLD CODE (concrete dependency created inside class — code smell: Direct Dependency):
        // private readonly UserRepository _userRepository = new UserRepository();
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
         // REFACTORED: Extracted ID generation into private method (Extract Method refactoring)
        // OLD CODE (Guid logic repeated inline in every Create method — code smell: Duplicated Code):
        // var user = new User { Id = Guid.NewGuid().ToString().Substring(0, 8), ... }
        // var job  = new Job  { Id = Guid.NewGuid().ToString().Substring(0, 8), ... }

        private string GenerateId() =>
            $"user-{Guid.NewGuid().ToString().Substring(0, 8)}";

        public List<User> GetAllUsers() => _userRepository.GetAll();

        public User? GetUserById(string id) => _userRepository.GetById(id);

        public User? RegisterUser(string name, string email, string password, string role)
        {

            // REFACTORED: Validation moved to service layer (SRP)
            // OLD CODE (validation inline in controller — code smell: Misplaced Responsibility):
            // if (users.Any(u => u.Email == req.Email)) return BadRequest("taken");

            if (_userRepository.GetByEmail(email) != null)
                return null;

            var user = new User
            {
                Id = GenerateId(),
                Name = name,
                Email = email,
                Password = password,
                Role = role,
                Bio = string.Empty,
                Skills = string.Empty,
                Phone = string.Empty,
                SavedJobs = new List<string>()
            };

            _userRepository.Add(user);
            return user;
        }

        public User? LoginUser(string email, string password)
        {
            var user = _userRepository.GetByEmail(email);
            if (user == null || user.Password != password)
                return null;
            return user;
        }

        public bool UpdateProfile(string userId, string bio, string skills, string phone)
        {
            var user = _userRepository.GetById(userId);
            if (user == null) return false;

            user.Bio = bio;
            user.Skills = skills;
            user.Phone = phone;
            _userRepository.Update(user);
            return true;
        }

        public bool ToggleSaveJob(string userId, string jobId)
        {
            var user = _userRepository.GetById(userId);
            if (user == null) return false;

             // REFACTORED: Extracted toggle logic (Replace Conditional with Clear Logic)
            // OLD CODE (if/else with separate Add/Remove — code smell: Verbose Conditional):
            // if (user.SavedJobs.Contains(jobId))
            // {
            //     user.SavedJobs.Remove(jobId);
            // }
            // else
            // {
            //     user.SavedJobs.Add(jobId);
            // }
            
            if (user.SavedJobs.Contains(jobId))
                user.SavedJobs.Remove(jobId);
            else
                user.SavedJobs.Add(jobId);

            _userRepository.Update(user);
            return true;
        }

        public bool DeleteUser(string id)
        {
            var user = _userRepository.GetById(id);
            if (user == null) return false;
            _userRepository.Delete(id);
            return true;
        }
    }
}