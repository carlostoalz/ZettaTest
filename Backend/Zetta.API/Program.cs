using Zetta.API;
using Zetta.BE;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.Configure<AppSetting>(builder.Configuration.GetSection("App"));
builder.Services.AddCorsDocumentation(builder.Configuration["AllowedOrigins"]);
builder.Services.AddEntityFramework(builder.Configuration);
builder.Services.AddDependencys();
builder.Services.AddSwaggerDocumentation();
builder.Services.AddAuth(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment()) app.UseSwaggerDocumentation();

app.UseHttpsRedirection();
app.UseCorsDocumentation();
app.UseAuthentication();
app.UseAuthorization();
app.UseUserMiddlewares();
app.UseUserRoutes();

app.Run();
