using HiringPlatform.Services;
using Microsoft.AspNetCore.Mvc;

namespace HiringPlatform.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("users")]
        public IActionResult GetAllUsers() =>
            Ok(_userService.GetAllUsers());

        [HttpGet("users/{id}")]
        public IActionResult GetUser(string id)
        {
            var user = _userService.GetUserById(id);
            if (user == null) return NotFound(new { message = "User not found" });
            return Ok(user);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest req)
        {
            var user = _userService.RegisterUser(req.Name, req.Email, req.Password, req.Role);
            if (user == null) return BadRequest(new { message = "Email already exists" });
            return StatusCode(201, user);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest req)
        {
            var user = _userService.LoginUser(req.Email, req.Password);
            if (user == null) return Unauthorized(new { message = "Invalid credentials" });
            return Ok(user);
        }

        [HttpPut("users/{id}/profile")]
        public IActionResult UpdateProfile(string id, [FromBody] ProfileRequest req)
        {
            var success = _userService.UpdateProfile(id, req.Bio, req.Skills, req.Phone);
            if (!success) return NotFound(new { message = "User not found" });
            return Ok(new { message = "Profile updated" });
        }

        [HttpPut("users/{id}/save-job/{jobId}")]
        public IActionResult ToggleSaveJob(string id, string jobId)
        {
            var success = _userService.ToggleSaveJob(id, jobId);
            if (!success) return NotFound(new { message = "User not found" });
            return Ok(new { message = "Saved jobs updated" });
        }

        [HttpDelete("users/{id}")]
        public IActionResult DeleteUser(string id)
        {
            var success = _userService.DeleteUser(id);
            if (!success) return NotFound(new { message = "User not found" });
            return Ok(new { message = "User deleted" });
        }
        
    }

    public record RegisterRequest(string Name, string Email, string Password, string Role);
    public record LoginRequest(string Email, string Password);
    public record ProfileRequest(string Bio, string Skills, string Phone);

    
}

