using HiringPlatform.Configuration;
using HiringPlatform.Interfaces;
using HiringPlatform.Repositories;
using HiringPlatform.Services;

var builder = WebApplication.CreateBuilder(args);

// REFACTORED: Config bound from appsettings.json (Configuration Management)
// OLD CODE (hardcoded values scattered across files — code smell: Magic Strings):
// var filePath = "Data/users.json";
// var corsOrigin = "http://localhost:5173";

// Configuration Management — bind appsettings.json to AppSettings class
builder.Services.Configure<AppSettings>(
    builder.Configuration.GetSection("AppSettings"));

// REFACTORED: Interfaces registered with DI container (DIP + OCP)
// OLD CODE (concrete classes instantiated directly — code smell: Direct Dependency):
// var userRepo = new UserRepository();
// var userService = new UserService(userRepo);


// DIP + Dependency Injection — register interfaces with concrete implementations
// OCP — new repos/services added here without touching existing code
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IJobRepository, JobRepository>();
builder.Services.AddScoped<IApplicationRepository, ApplicationRepository>();

// Services registered for DI
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<JobService>();
builder.Services.AddScoped<ApplicationService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// REFACTORED: CORS origin from config (Configuration Management)
// OLD CODE (hardcoded origin — code smell: Magic String):
// policy.WithOrigins("http://localhost:5173")

// Configuration Management — CORS origin from appsettings.json
var allowedOrigin = builder.Configuration["AppSettings:AllowedOrigin"] ?? "http://localhost:5173";

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins(allowedOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("FrontendPolicy");
app.UseAuthorization();
app.MapControllers();
app.Run();